"use client";
import { useState } from "react";
import AddItemForm, { SingleEdit } from "./AddItemForm";
import ReviewChangesForm from "./ReviewChangesForm";

export default function ScoreEditingForms() {
	const [stagedChanges, setStagedChanges] = useState<Array<SingleEdit>>([]);
	return (
		<div className='flex flex-col justify-between w-7/8 m-auto'>
			<h1 className='text-4xl text-center'>Score Editor</h1>
			<AddItemForm
				stagedChanges={stagedChanges}
				setStagedChanges={setStagedChanges}
			/>
			<ReviewChangesForm
				stagedChanges={stagedChanges}
				setStagedChanges={setStagedChanges}
			/>
		</div>
	);
}
