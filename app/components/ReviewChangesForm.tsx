"use client";
import { useState, useEffect } from "react";
import { SingleEdit } from "./AddItemForm";
import ReviewSingleChange from "./ReviewSingleChange";

export default function ReviewChangesForm({
	stagedChanges,
	setStagedChanges,
}: {
	stagedChanges: Array<SingleEdit>;
	setStagedChanges: (stagedChanges: Array<SingleEdit>) => void;
}) {
	const [responseMessage, setResponseMessage] = useState("");
	const [confirmationColor, setConfirmationColor] = useState("");
	useEffect(() => {
		const timer = setTimeout(() => {
			setResponseMessage("");
			setConfirmationColor("");
		}, 5000);
		return () => clearTimeout(timer);
	}, [responseMessage]);
	const handlePostRequest = async () => {
		const postBody = JSON.stringify({ edits: [...stagedChanges] });
		try {
			const response = await fetch("/api/endpoint", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: postBody,
			});

			if (response.ok) {
				const data = await response.json();
				setResponseMessage(data.message);
				setConfirmationColor("bg-green-200");
				console.log("JSON Submitted");
				console.log(JSON.stringify(stagedChanges));
			}
		} catch (error) {
			console.error("Error:", error);
			setResponseMessage("An error occurred on attempt to post changes.");
			setConfirmationColor("bg-red-200");
			//TODO: handle error where uuid doesn't exist--highlight the uuid in the shopping cart. May be done here or by fetching data earlier depending on backend.
		}
	};
	const handlePostRequestMock = () => {
		const postBody = JSON.stringify({ edits: [...stagedChanges] });
		const diceRoll = Math.floor(Math.random() * 10);
		if (diceRoll > 1) {
			setResponseMessage("Edits successfully updated!");
			setConfirmationColor("bg-green-200");
			console.log("JSON Submitted");
			console.log(postBody);
		} else {
			setResponseMessage("An error occurred on attempt to post changes.");
			setConfirmationColor("bg-red-200");
		}
	};
	return (
		<>
			<div className='grid md:grid-cols-2 xl:grid-cols-5 w-full'>
				{stagedChanges.map((singleEdit, i) => (
					<ReviewSingleChange
						key={singleEdit.sample_uuid}
						index={i}
						singleEdit={singleEdit}
						stagedChanges={stagedChanges}
						setStagedChanges={setStagedChanges}
					/>
				))}
			</div>
			<button
				onClick={handlePostRequestMock}
				className='my-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 col-span-full w-50 mx-auto'
			>
				Submit All Edits
			</button>
			<div
				className={
					"rounded-md p-2 col-span-full w-full text-center " + confirmationColor
				}
			>
				{responseMessage}
			</div>
		</>
	);
}
