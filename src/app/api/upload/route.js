export async function POST(req){
  const data = await req.formData();
  if(data.get('file')){
    
  }
  return Response.json(true);
}