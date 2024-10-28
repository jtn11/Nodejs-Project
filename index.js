const express = require("express")
const PORT = 8000;
const app = express();
const BookModel = require("./model/Book");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Create New Book in Store

app.get("/", (req, res) => {
    res.render("Home");
})

app.post("/", async (req, res) => {
    const { Title, Author, Publisher, PublishedDate } = req.body;
    const book = await BookModel.findOne({ Title });
    if (book) {
        return res.status(500).send("Book Already Exist")
    }

    await BookModel.create({
        Title,
        Author,
        Publisher,
        PublishedDate
    });

    res.send("Registered");
})

// See the Store (Collection)

app.get("/collection", async (req, res) => {
    const Books = await BookModel.find();
    res.json(Books);
})


// Delete Book from Collection

app.post("/delete", async (req, res) => {

    const { Title, Author } = req.body;
    const BookDetail = await BookModel.findOneAndDelete({ Title, Author });
    if (BookDetail) {
        res.send("Book Deleted From Collection")
    }
    else {
        res.send("Book Not Available");
    }
});


// Update book From Collection 

app.get("/update", (req, res) => {
    res.render("update");
});

app.post("/update", async(req, res) => {
    const { Title,newTitle, newAuthor, newPublisher, newPublishedDate } = req.body;

    const UpdateBook = await BookModel.findOneAndUpdate(
        { Title },
        {
            Title : newTitle,
            Author: newAuthor,
            Publisher: newPublisher,
            PublishedDate: newPublishedDate
        },
        { new: true }
    )

    if(UpdateBook){
        res.send("Book Updated Successfully")
    }
    else { 
        res.send("Book not found")
    }
})

app.listen(PORT, () => console.log(`Server connected at PORT ${PORT}`))