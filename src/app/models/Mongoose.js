import mongoose, {Schema} from "mongoose";

const LeadSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    phoneNumber: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true 
    },
    fitnessGoal: { 
      type: String,
      enum: ['weight-loss', 'muscle-gain', 'strength', 'endurance', 'flexibility'],
      required: false
    },
    experienceLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: false
    },
    preferredTime: {
      type: String,
      enum: ['early-morning', 'morning', 'afternoon', 'evening', 'night'],
      required: false
    },
    interests: [{
      type: String,
      enum: ['Personal Training', 'Group Classes', 'Nutrition Coaching', 'Yoga', 'CrossFit']
    }]
  },
  {
    timestamps: true,
  }
);

const LeadModel = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
export default LeadModel;