import  {User} from "@/app/models/userModel"
import  mongoose  from "mongoose";

export async function POST(req){
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const pass = body.password;
  if(!pass?.length || pass.length < 5){
    new Error('password must be at least 5 characters');
  }
  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = await bcrypt.hashSync(notHashedPassword,salt)

  const user = await User.create(body);
  return Response.json(user);
}

