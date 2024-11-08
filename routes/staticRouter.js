const express = require("express")
const router = express.Router();

const BookModel = require("../model/Book")


router.get("/", (req, res) => {
    res.render("Home");
})

router.post("/", async (req, res) => {
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


router.get("/collection", async (req, res) => {
    const Books = await BookModel.find();
    res.json(Books);
})

// Delete Book from Collection

router.post("/delete", async (req, res) => {

    const { Title, Author } = req.body;
    const BookDetail = await BookModel.findOneAndDelete({ Title, Author });
    if (BookDetail) {
        res.send("Book Deleted From Collection")
    }
    else {
        res.send("Book Not Available");
    }
});


router.get("/update", (req, res) => {
    res.render("update");
});

router.post("/update", async(req, res) => {
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

module.exports = router;