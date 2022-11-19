import multer from "multer";
import {Request, Response, NextFunction} from 'express'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    const type = req.url.split("/")[1];
    if (type === "users") cb(null, "public/users");
    else if (type == "posts") {
      cb(null, "public/posts");
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now()  + ".jpg" || ".png" || ".wepg");
  },
});

const upload = multer({ storage: storage }).single("image");

export const uploadImages = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err) => {
    if (err) console.log(err);
    next(undefined);
  });
};
