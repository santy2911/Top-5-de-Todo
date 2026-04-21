import express from "express";
import cors from "cors";
import listasRoutes from "./routes/listas.routes";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/v1/listas", listasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});