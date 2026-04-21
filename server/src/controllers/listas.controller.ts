import { Request, Response } from "express";
import * as ListasService from "../services/listas.service";

export const getAll = (_req: Request, res: Response): void => {
  res.status(200).json(ListasService.obtenerTodas());
};

export const getById = (req: Request, res: Response): void => {
  const id = String(req.params.id);
  const lista = ListasService.obtenerPorId(id);
  if (!lista) {
    res.status(404).json({ error: "Lista no encontrada" });
    return;
  }
  res.status(200).json(lista);
};

export const create = (req: Request, res: Response): void => {
  const { titulo, posiciones } = req.body;
  if (!titulo || !Array.isArray(posiciones)) {
    res.status(400).json({ error: "titulo y posiciones son obligatorios" });
    return;
  }
  const nueva = ListasService.crear({ titulo, posiciones });
  res.status(201).json(nueva);
};

export const update = (req: Request, res: Response): void => {
  const id = String(req.params.id);
  const { titulo, posiciones } = req.body;
  if (!titulo || !Array.isArray(posiciones)) {
    res.status(400).json({ error: "titulo y posiciones son obligatorios" });
    return;
  }
  const actualizada = ListasService.actualizar(id, { titulo, posiciones });
  if (!actualizada) {
    res.status(404).json({ error: "Lista no encontrada" });
    return;
  }
  res.status(200).json(actualizada);
};

export const remove = (req: Request, res: Response): void => {
  const id = String(req.params.id);
  const eliminada = ListasService.eliminar(id);
  if (!eliminada) {
    res.status(404).json({ error: "Lista no encontrada" });
    return;
  }
  res.status(200).json({ mensaje: "Lista eliminada correctamente" });
};