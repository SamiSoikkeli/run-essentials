document.addEventListener("DOMContentLoaded", function () {
	function timeToSeconds(time) {
		const [minutes, seconds] = time.split(":").map(Number);
		return minutes * 60 + seconds;
	}

	function secondsToTime(seconds) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${String(minutes).padStart(
			2,
			"0"
		)}:${String(remainingSeconds).padStart(2, "0")}`;
	}

	function convertPace(event) {
		const minKmInput = document.getElementById("minKm");
		const minMileInput = document.getElementById("minMile");

		const kmToMile = 1.60934;
		const mileToKm = 1 / kmToMile;

		let sourceInput = event.target.id;
		let minKm, minMile;

		if (sourceInput === "minKm") {
			minKm = minKmInput.value;
			if (minKm && /^[0-5]?\d:[0-5]\d$/.test(minKm)) {
				const minKmInSeconds = timeToSeconds(minKm);
				const convertedMinMileInSeconds = minKmInSeconds / mileToKm;
				minMileInput.value = secondsToTime(
					Math.round(convertedMinMileInSeconds)
				);
			} else {
				minMileInput.value = "";
			}
		} else if (sourceInput === "minMile") {
			minMile = minMileInput.value;
			if (minMile && /^[0-5]?\d:[0-5]\d$/.test(minMile)) {
				const minMileInSeconds = timeToSeconds(minMile);
				const convertedMinKmInSeconds = minMileInSeconds * mileToKm;
				minKmInput.value = secondsToTime(
					Math.round(convertedMinKmInSeconds)
				);
			} else {
				minKmInput.value = "";
			}
		}
	}

	document.getElementById("minKm").addEventListener("input", convertPace);
	document.getElementById("minMile").addEventListener("input", convertPace);
});
