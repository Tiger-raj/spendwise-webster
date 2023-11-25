const TargetSchema = require("../models/TargetModel")


exports.addTarget = async (req, res) => {
    
    const {title, amount, category, description, date} = req.body

    const target = TargetSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date) {
            return res.status(400).json({mesage: 'All fields are required!'})
        }
        if(amount <=0 || !amount === 'number') {
            return res.status(400).json({mesage: 'All fields are required!'})
        }
        await target.save()
        res.status(200).json({message: 'Target Added'})
        
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
        
        
    }

    console.log(target)

}

exports.getTarget = async (req, res) => {
    try {
       const target = await TargetSchema.find().sort({createdAt: -1})
       res.status(200).json(target) 
    } catch (error) {
        res.status(500).json({message: 'Server error'})
        
    }

}

exports.deleteTarget = async (req, res) => {
   const {id} = req.params;
   
   TargetSchema.findByIdAndDelete(id)
    .then((target) => {
        res.status(200).json({message: 'Target Deleted'})

    })
    .catch((err) => {
      res.status(500).json({message: 'Server Error'})
    })
}

