import { FormEvent, useState } from "react";
import { SingleEdit } from "./AddItemForm";
import EditInput from "./EditInput";
import Form from "next/form";

export default function ReviewSingleChange({
	index,
	singleEdit,
	stagedChanges,
	setStagedChanges,
}: {
	index: number;
	singleEdit: SingleEdit;
	stagedChanges: Array<SingleEdit>;
	setStagedChanges: (stagedChanges: Array<SingleEdit>) => void;
}) {
	const [editState, setEditState] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [scoreType, setScoreType] = useState<string>("");

	const submitEdit = (formData: FormData) => {
		const newStagedChanges = [...stagedChanges];
		const sampleUuid = formData.get("sample_uuid")?.toString();
		const scorer = formData.get("scorer")?.toString();
		const newScore = formData.get("value")?.toString();
		const explanation = formData.get("explanation")?.toString();
		const reason = formData.get("reason")?.toString();
		let errorMessage = "";

		if (!sampleUuid || !scorer || !newScore || !reason) return;
		const existingUuids = new Set();
		newStagedChanges.forEach(item => {
			if (item.sample_uuid !== newStagedChanges[index].sample_uuid) {
				existingUuids.add(item.sample_uuid);
			}
		});
		if (existingUuids.has(sampleUuid)) {
			errorMessage = "UUID is already being edited in this session.";
		}

		const stagedEdit: SingleEdit = {
			sample_uuid: sampleUuid,
			scorer,
			value: parseFloat(newScore),
			explanation,
			reason,
		};
		newStagedChanges[index] = stagedEdit;

		if (errorMessage === "") {
			setStagedChanges([...newStagedChanges]);
			setEditState(false);
		}
		setError(errorMessage);
	};

	const deleteEdit = () => {
		const newStagedChanges = [...stagedChanges];
		newStagedChanges.splice(index, 1);
		setStagedChanges([...newStagedChanges]);
	};

	return editState ? (
		<Form
			action={submitEdit}
			className='flex flex-col p-4 bg-yellow-100 outline-1 rounded-2xl w-full items-top gap-5'
		>
			<EditInput
				type='text'
				name='sample_uuid'
				placeholder='Sample UUID (Required)'
				label='Sample UUID'
				defaultValue={singleEdit.sample_uuid}
			/>
			<EditInput
				type='text'
				name='scorer'
				placeholder='Email (Required)'
				label='Scorer'
				defaultValue={singleEdit.scorer}
			/>
			<EditInput
				type={scoreType}
				name='value'
				placeholder={
					scoreType === "number" ? "Number (Required)" : "String (Required)"
				}
				label='Score'
				defaultValue={singleEdit.value}
			>
				<fieldset className='flex justify-between p-2'>
					<div>
						<input
							type='radio'
							id='numberValue'
							name='valueType'
							value='number'
							defaultChecked={typeof singleEdit.value === "number"}
							onChange={() => setScoreType("number")}
						/>
						<label className='ml-2' htmlFor='numberValue'>
							Number
						</label>
					</div>
					<div>
						<input
							type='radio'
							id='stringValue'
							name='valueType'
							value='string'
							defaultChecked={typeof singleEdit.value === "string"}
							onChange={() => setScoreType("string")}
						/>
						<label className='ml-2' htmlFor='stringValue'>
							String
						</label>
					</div>
					<div>
						<input
							type='radio'
							id='boolValue'
							name='valueType'
							value='checkbox'
							defaultChecked={typeof singleEdit.value === "boolean"}
							onChange={() => setScoreType("checkbox")}
						/>
						<label className='ml-2' htmlFor='stringValue'>
							Boolean
						</label>
					</div>
				</fieldset>
			</EditInput>
			<EditInput
				type='text'
				name='explanation'
				placeholder='(Optional)'
				label='Explanation'
				defaultValue={singleEdit.explanation}
			/>
			<EditInput
				type='text'
				name='reason'
				placeholder='(Required)'
				label='Reason'
				defaultValue={singleEdit.reason}
			/>
			<div className='flex justify-between col-span-full'>
				<button
					type='submit'
					className='m-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-50'
				>
					Confirm Edit
				</button>
				<button
					className='m-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 w-50'
					onClick={deleteEdit}
				>
					Delete Entry
				</button>
			</div>
			<div className='text-red-500'>
				<b>{error}</b>
			</div>
		</Form>
	) : (
		<div className='m-2 p-2 bg-gray-200 rounded-md'>
			<div className='grid grid-cols-2 gap-3'>
				<label>Sample UUID</label> {singleEdit.sample_uuid}
				<label>Scorer</label> {singleEdit.scorer}
				<label>New Score</label>{" "}
				{typeof singleEdit.value === "boolean"
					? singleEdit.value
						? "True"
						: "False"
					: singleEdit.value}
				<label>Explanation</label> <div>{singleEdit.explanation}</div>
				<label>Reason</label> {singleEdit.reason}
			</div>
			<button
				className='bg-blue-500 text-white m-2 p-2 rounded-md hover:bg-blue-600 float-end'
				onClick={() => setEditState(true)}
			>
				Edit
			</button>
		</div>
	);
}
