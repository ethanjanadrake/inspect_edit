import { ChangeEvent, ReactElement, Dispatch, SetStateAction } from "react";

export default function BaseInput({
	type,
	name,
	label,
	placeholder,
	required,
	disableState,
	defaultValue,
	defaultChecked,
	setDisableState,
	onChangeTextArea,
	validationErrorMessage,
	sampleList,
	children,
}: {
	type: string;
	name: string;
	label: string;
	placeholder: string;
	required: boolean;
	disableState: boolean;
	defaultValue: string;
	defaultChecked?: boolean;
	setDisableState: Dispatch<SetStateAction<boolean>>;
	onChangeTextArea?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	validationErrorMessage?: string;
	sampleList?: Array<string>;
	children?: ReactElement;
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
					<div className='flex justify-start'>
						{type === "checkbox" ? (
							<label
								className={`m-2 p-2 rounded-lg ${
									disableState ? "text-gray-400" : ""
								} ${
									disableState
										? "bg-gray-300 text-gray-700 outline-white accent-gray-400"
										: "bg-white"
								}`}
							>
								True/False:
							</label>
						) : (
							<></>
						)}
						<input
							name={name}
							type={type}
							placeholder={placeholder}
							required={required}
							tabIndex={disableState ? -1 : 0}
							readOnly={disableState}
							defaultValue={defaultValue}
							defaultChecked={defaultChecked}
							className={`m-2 p-2 rounded-lg ${
								type === "checkbox" ? "" : "w-full outline-1"
							} ${
								disableState
									? "bg-gray-300 text-gray-700 outline-white accent-gray-400"
									: "bg-white"
							} ${
								type === "checkbox" && disableState ? "pointer-events-none" : ""
							}`}
						/>
					</div>
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
				{children}
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
