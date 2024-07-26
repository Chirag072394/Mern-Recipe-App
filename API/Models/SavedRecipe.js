import mongoose from "mongoose";

const SavedRecipeSchema = new mongoose.Schema({
    recipe:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'recipe',
    }
});

export const savedRecipe = mongoose.model("savedRecipe",SavedRecipeSchema)