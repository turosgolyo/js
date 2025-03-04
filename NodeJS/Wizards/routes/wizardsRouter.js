import express from "express";
import wizards from '../data/wizards.js';

const router = express.Router();

router.get('/wizards', (req, res) => {
    res.status(200).json(wizards)
});

router.get('/wizards/:id', (req, res) => {
  const id = req.params.id;

  if(id < 0 || id >= wizards.length){
    return res.status(404).json({message: "Wizard not found!"});
  }

  res.status(200).json(wizards[id]);
});

router.post('/wizards', (req, res) => { 
  const {name, wand, house} = req.body;

  if(!name || !wand || !house){
    return res.json({ message: "Missing data!" })
  }

  const newWizard = {name, wand, house}
  wizards.push(newWizard);
  res.status(201).json(newWizard);
});

router.put('/wizards/:id', (req, res) => {
  const id = req.params.id;

  if(id < 0 && id >= wizards.length){
    return res.status(404).json({message: "Wizard not found!"});
  }
  
  const {name, wand, house} = req.body;
  
  if(!name || !wand || !house){
    return res.json({ message: "Missing data!" })
  }

  wizards[id] = {name, wand, house};
  res.status(201).json(wizards[id]);
});

router.delete('/wizards/:id', (req, res) => {
  const id = req.params.id;
  
  if(id < 0 || id >= wizards.length){
    return res.status(404).json({message: "Wizard not found!"});
  }
  
  wizards.splice(id, 1);
  res.json({ message: "Delete successful" });
});

export default router;