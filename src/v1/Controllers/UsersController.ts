import { Request, Response } from "express";
import UsersModel from "../Models/UsersModel";
import bcrypt from "bcrypt";
import { createUserValidation } from "../Validations/UserValodations";

export const createUserAccount = async (req: Request, res: Response) => {
	try {
		const { error } = createUserValidation(req.body);
		if (error)
			return res.status(400).json({ message: error.details[0].message });

		const email: String = req.body.email;
		const username: String = req.body.username;
		const password = req.body.password;

		const userEmailExist = await UsersModel.findOne({
			email: email.toLowerCase(),
		});
		if (userEmailExist)
			return res
				.status(501)
				.json({ status: false, message: "Email already exist, thank you" });

		const userNameExist = await UsersModel.findOne({
			username: username,
		});

		if (userNameExist)
			return res
				.status(501)
				.json({ status: false, message: "Email already exist" });

		const user_id = Math.floor(1000 + Math.random() * 9000);
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		const createNewUser = new UsersModel({
			user_id: user_id,
			username: username,
			email: email.toLowerCase(),
			profile: "",
			password: hash,
		});

		const createdUser = await createNewUser.save();

		if (createdUser) {
			return res
				.status(201)
				.json({
					status: true,
					message: "User created successfully",
					data: {
						user_id: user_id,
						username: username,
						email: email.toLowerCase(),
						profile: "",
					},
				});
		}
	} catch (error) {
		console.log(error);
		return res
			.status(401)
			.json({ status: false, message: "Something went wrong" });
	}
};
