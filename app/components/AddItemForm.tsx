"use client";
import Form from "next/form";
import { useState, ChangeEvent } from "react";
import BaseInput from "./BaseInput";

export default function AddItemForm({
	stagedChanges,
	setStagedChanges,
}: {
	stagedChanges: Array<SingleEdit>;
	setStagedChanges: (stagedChanges: Array<SingleEdit>) => void;
}) {
	const [sampleUuidList, setSampleUuidList] = useState<Array<string>>([]);
	const [disableSampleUuids, setDisableSampleUuids] = useState(false);
	const [disableScorer, setDisableScorer] = useState(false);
	const [disableValue, setDisableValue] = useState(false);
	const [disableExplanation, setDisableExplanation] = useState(false);
	const [disableReason, setDisableReason] = useState(false);
	const [scorerState, setScorerState] = useState("");
	const [valueState, setValueState] = useState("");
	const [explanationState, setExplanationState] = useState("");
	const [reasonState, setReasonState] = useState("");
	const [uuidError, setUuidError] = useState("");

	const updateUuids = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const sampleUuids = e.target.value?.toString().trim();
		const newSampleUuidList = sampleUuids?.split(/[,\s\r?\n]/);
		const savedUuids = stagedChanges.map(item => {
			return item.sample_uuid;
		});
		const allUuids = [...newSampleUuidList, ...savedUuids];
		const uniqueUuids = new Set();

		if (newSampleUuidList) {
			setSampleUuidList(newSampleUuidList);
		}

		let errorMessage = "";
		allUuids.forEach(id => {
			if (uniqueUuids.has(id)) {
				errorMessage =
					"One or more UUIDs already exist or you entered the same UUID twice.";
			} else {
				uniqueUuids.add(id);
			}
		});
		setUuidError(errorMessage);
	};

	const addToStagedChanges = (formData: FormData) => {
		const sampleUuid = sampleUuidList[0];
		let scorer = formData.get("scorer")?.toString();
		let newScore = formData.get("value")?.toString();
		let explanation = formData.get("explanation")?.toString();
		let reason = formData.get("reason")?.toString();
		if (!sampleUuid || !scorer || !newScore || !reason) return;
		const newStagedChanges = [...stagedChanges];

		newStagedChanges.push({
			sample_uuid: sampleUuid,
			scorer,
			value: parseFloat(newScore),
			explanation,
			reason,
		});

		sampleUuidList.shift();

		if (!disableScorer) {
			scorer = "";
		}
		if (!disableValue) {
			newScore = "";
		}
		if (!disableExplanation) {
			explanation = "";
		}
		if (!disableReason) {
			reason = "";
		}

		setScorerState(scorer);
		setValueState(newScore);
		setExplanationState(explanation || "");
		setReasonState(reason);

		setStagedChanges(newStagedChanges);
	};
	return (
		<Form
			action={addToStagedChanges}
			className='m-2 p-4 bg-yellow-100 outline-1 rounded-2xl grid md:grid-cols-2 xl:grid-cols-5 w-full items-top gap-5'
		>
			<BaseInput
				type='textarea'
				name='sample_uuids'
				label='Sample UUIDs'
				placeholder='(Required) UUIDs Separated by Spaces, Commas, or Newlines'
				required={true}
				disableState={disableSampleUuids}
				setDisableState={setDisableSampleUuids}
				onChangeTextArea={updateUuids}
				sampleList={sampleUuidList}
				defaultValue={sampleUuidList.join("\n")}
				validationErrorMessage={uuidError}
			></BaseInput>
			<BaseInput
				type='text'
				name='scorer'
				label='Scorer'
				placeholder='Scorer Name (Required)'
				required={true}
				disableState={disableScorer}
				setDisableState={setDisableScorer}
				defaultValue={scorerState}
			></BaseInput>
			<BaseInput
				type='number'
				name='value'
				label='Score'
				placeholder='Number (Required)'
				required={true}
				disableState={disableValue}
				setDisableState={setDisableValue}
				defaultValue={valueState}
			></BaseInput>
			<BaseInput
				type='text'
				name='explanation'
				label='Explanation for Score'
				placeholder='(Optional)'
				required={false}
				disableState={disableExplanation}
				setDisableState={setDisableExplanation}
				defaultValue={explanationState}
			></BaseInput>
			<BaseInput
				type='text'
				name='reason'
				label='Reason for Edit'
				placeholder='(Required)'
				required={true}
				disableState={disableReason}
				setDisableState={setDisableReason}
				defaultValue={reasonState}
			></BaseInput>
			<button
				type='submit'
				className='my-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 col-span-full w-50 mx-auto'
			>
				Add to Staged Changes
			</button>
		</Form>
	);
}

export interface SingleEdit {
	sample_uuid: string;
	scorer: string;
	value: number;
	explanation?: string;
	reason: string;
}
