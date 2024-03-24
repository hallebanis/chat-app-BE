import Message from '../models/messageModel.js'
import Conversation from '../models/conversationModel.js'

export const sendMessage= async(req,res)=>{
    try {
        const  {id:receiverId}=req.params
        const {message}=req.body
        const senderId=req.userId
    
        let conversation= await Conversation.findOne({participants:{$all : [senderId,receiverId]}})
        if(!conversation){
            conversation= await Conversation.create({
                participants:[senderId,receiverId]
            })
        }
    
        const newMessage= new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        await newMessage.save()
        await conversation.save() 
        res.json({message:newMessage})
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Internal error!!'})
    }
    
}

export const getMessages= async (req,res)=>{
    try {
        const {id:receiverId}=req.params
        const senderId=req.userId

        const conversation= await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate('messages')
        if(!conversation){
            return res.status(200).json([])
        }
        res.send(conversation.messages)
    } catch (error) {
        console.error(error);
        res.status(500).json({error:'Internal error!!'})
    }
}