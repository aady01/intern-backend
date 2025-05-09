import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const addDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await prisma.doctor.create({ data: req.body });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const listDoctors = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, gender, experience, specialty } = req.query;

  const filters: any = {};
  if (gender) filters.gender = gender;
  if (experience) filters.experience = Number(experience);
  if (specialty) filters.specialty = specialty;

  try {
    const skip = (Number(page) - 1) * Number(limit);

    const [doctors, total] = await Promise.all([
      prisma.doctor.findMany({
        where: filters,
        skip,
        take: Number(limit),
      }),
      prisma.doctor.count({ where: filters }),
    ]);

    res.json({
      data: doctors,
      meta: {
        total,
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
