import { ChangeEvent } from "react";
import { Dispatch, SetStateAction } from "react";

export default function BaseInput({
	type,
	name,
	label,
	placeholder,
	required,
	disableState,
	defaultValue,
	setDisableState,
	onChangeTextArea,
	validationErrorMessage,
	sampleList,
}: {
	type: string;
	name: string;
	label: string;
	placeholder: string;
	required: boolean;
	disableState: boolean;
	defaultValue: string;
	setDisableState: Dispatch<SetStateAction<boolean>>;
	onChangeTextArea?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	validationErrorMessage?: string;
	sampleList?: Array<string>;
}) {
	return (
		<div className='flex flex-col w-full'>
			{sampleList ? (
				<>
					<div>Current UUID</div>
					<div className='m-2 p-2 bg-gray-200 rounded-lg w-40'>
						{sampleList[0]}
					</div>
				</>
			) : (
				<></>
			)}
			<label htmlFor={name}>{label}</label>
			<div className='flex flex-col'>
				{onChangeTextArea ? (
					<textarea
						name={name}
						placeholder={placeholder}
						required={required}
						tabIndex={disableState ? -1 : 0}
						readOnly={disableState}
						onChange={onChangeTextArea}
						defaultValue={defaultValue}
						className={`m-2 p-2 outline-1 rounded-lg w-full ${
							disableState
								? "bg-gray-300 text-gray-700 outline-white"
								: "bg-white"
						}`}
					/>
				) : (
					<input
						name={name}
						type={type}
						placeholder={placeholder}
						required={required}
						tabIndex={disableState ? -1 : 0}
						readOnly={disableState}
						defaultValue={defaultValue}
						className={`m-2 p-2 outline-1 rounded-lg w-full ${
							disableState
								? "bg-gray-300 text-gray-700 outline-white"
								: "bg-white"
						}`}
					/>
				)}
				<div className='flex justify-end'>
					<label htmlFor='disable_sample_uuids'>Lock</label>
					<input
						name={"disable_" + name}
						type='checkbox'
						defaultChecked={disableState}
						tabIndex={-1}
						className='ml-2'
						onChange={e => {
							setDisableState(e.target.checked);
						}}
					/>
				</div>
				{validationErrorMessage ? (
					<div className='text-red-500'>
						<b>{validationErrorMessage}</b>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
