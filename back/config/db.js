const mongoose = require("mongoose");

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER_PASS}@fairytail.teywr.mongodb.net/web-project?retryWrites=true&w=majority&appName=FairyTail`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }
    )
    .then(() => console.log("MongoDB est connecté."))
    .catch((err) => console.log("Erreur de connection MongoDB", err))