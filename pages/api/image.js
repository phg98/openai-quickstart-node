import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const response = await openai.createImage({
    prompt: generatePrompt(req.body.animal),
    n: 1,
    size: "1024x1024",
  });
  console.log(response.data);
  let image_url = response.data.data[0].url;
  console.log(image_url);
  res.status(200).json({ result: image_url });
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `a close up, studio photographic portrait of a ${capitalizedAnimal} that looks adorable and friendly.`;  
}
