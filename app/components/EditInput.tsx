export default function EditInput({
	type,
	name,
	placeholder,
	label,
	defaultValue,
}: {
	type: string;
	name: string;
	placeholder: string;
	label: string;
	defaultValue: string | number | undefined;
}) {
	return (
		<div className='flex flex-col'>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				defaultValue={defaultValue}
				className='p-2 bg-white outline-black outline-1 rounded-lg w-full'
			/>
		</div>
	);
}
