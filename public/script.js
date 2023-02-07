function catch_value_types() {
	const selectedValue = document.getElementById("route").value;
	const select2 = document.getElementById("initRoute");
	Array.from(select2.options).forEach(
		(node) =>
			(node.style.display = node.className === selectedValue ? "block" : "none")
	);
}
let handleShaxs = (x) => {
	let selectedValue1 = document.getElementById("jismoniy");
	let selectedValue2 = document.getElementById("yuridik");
	selectedValue1.classList.add("d-none");
	selectedValue2.classList.add("d-none");
	if (x.value == "jismoniy") {
		selectedValue1.classList.remove("d-none");
	} else {
		selectedValue2.classList.remove("d-none");
	}
};
