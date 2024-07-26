import { Recipe } from "../Models/Recipe.js";
import {savedRecipe} from "../Models/SavedRecipe.js"


export const add = async (req, res) => {
  const { title, ist, ing1, ing2, ing3, ing4, qty1, qty2, qty3, qty4, imgurl } =
    req.body;

  try {
    const recipe = await Recipe.create({
      title,
      ist,
      ing1,
      ing2,
      ing3,
      ing4,
      qty1,
      qty2,
      qty3,
      qty4,
      imgurl,
      user:req.user,
    });

    res.json({message:"Recipe Created Successfully..!",recipe})

  }catch (error) {

    res.json({message:error})

  }
};

export const getAllRecipe = async(req,res)=>{
    const recipe =  await Recipe.find();
    res.json({recipe})
}

export const getRecipeById = async(req,res)=>{
    const id = req.params.id;

    try{
        let recipe = await Recipe.findById(id)
    
        if(!recipe) return res.json({message:"recipe does not exist"})

        res.json({message:"recipe by id",recipe})

    }catch(error){
        res.json({message:error})
    }

}

export const getRecipeByUserId = async(req,res)=>{
    const userId = req.params.id;
    
    try{
        let recipe = await Recipe.find({user:userId})
    
        if(!recipe) return res.json({message:"recipe does not exist"})

        res.json({message:"recipe by userId",recipe})

    }catch(error){
        res.json({message:error})
    }

}

export const savedRecipeById = async(req,res)=>{
    const id = req.params.id

    let recipe = await savedRecipe.findOne({recipe:id})

    if(recipe) return res.json({message: "recipe already saved"})

    recipe = await savedRecipe.create({recipe:id})

    res.json({message:"recipe Saved Successfully"})
}


export const getSavedRecipe = async(req,res)=>{
    const recipe = await savedRecipe.find()

    res.json({recipe});
}
