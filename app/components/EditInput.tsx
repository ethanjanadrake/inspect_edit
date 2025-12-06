import { ReactElement } from "react";

export default function EditInput({
	type,
	name,
	placeholder,
	label,
	defaultValue,
	children,
}: {
	type: string;
	name: string;
	placeholder: string;
	label: string;
	defaultValue: string | number | boolean | undefined;
	children?: ReactElement;
}) {
	return (
		<div className='flex flex-col'>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				defaultValue={
					typeof defaultValue === "number" || typeof defaultValue === "string"
						? defaultValue
						: ""
				}
				className='p-2 bg-white outline-black outline-1 rounded-lg w-full'
			/>
			{children}
		</div>
	);
}
