import React, { useState } from "react";

import { Storage, API, graphqlOperation } from "aws-amplify";

import awsExports from "../src/aws-exports";

import { createPicture } from "../src/graphql/mutations";

export default function UploadImages() {
	const [file, setFile] = useState("null");

	const addImageToDB = async (image) => {
		console.log("add image to db");
		try {
			await API.graphql(graphqlOperation(createPicture, { input: image }));
		} catch (error) {
			console.log(error);
		}
	};

	const onChange = (e) => {
		const file = e.target.files[0];
		console.log(file);

		Storage.put(file.name, file, {
			contentType: "image/png",
		}).then((result) => {
			setFile(URL.createObjectURL(file));

			const image = {
				name: file.name,
				file: {
					bucket: awsExports.aws_user_files_s3_bucket,
					region: awsExports.aws_user_files_s3_bucket_region,
					key: "public/" + file.name,
				},
			};

			console.log(image);

			addImageToDB(image);

			console.log("added completed");
		});
	};
	return (
		<div className="image_uplod">
			<div>
				<p>Please select an image to upload.</p>
				<input type="=file" onChange={(e) => onChange(e)} />
			</div>
		</div>
	);
}
