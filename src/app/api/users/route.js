import connectMongoDB from "../../libs/mongodb";
import LeadModel from "../../models/Mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const leads = await LeadModel.find();
    return NextResponse.json({ leads });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { 
      name, 
      phoneNumber, 
      email, 
      fitnessGoal, 
      experienceLevel, 
      preferredTime, 
      interests 
    } = await request.json();

    await connectMongoDB();

    const newLead = await LeadModel.create({ 
      name, 
      phoneNumber, 
      email, 
      fitnessGoal, 
      experienceLevel, 
      preferredTime, 
      interests 
    });

    return NextResponse.json(
      { message: "Lead created successfully", lead: newLead }, 
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create lead" }, 
      { status: 500 }
    );
  }
}