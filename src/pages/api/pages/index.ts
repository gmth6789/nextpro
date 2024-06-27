import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const pages = await prisma.page.findMany();
    res.json(pages);
  } else if (req.method === 'POST') {
    const { title, content } = req.body;
    const page = await prisma.page.create({
      data: {
        title,
        content,
      },
    });
    res.json(page);
  } else {
    res.status(405).end();
  }
}
