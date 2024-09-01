document.addEventListener("DOMContentLoaded", function () {
	let isMetric = true; // Default unit is metric

	document
		.getElementById("metricUnit")
		.addEventListener("click", function () {
			isMetric = true;
			updateUnitSelection();
		});

	document
		.getElementById("imperialUnit")
		.addEventListener("click", function () {
			isMetric = false;
			updateUnitSelection();
		});

	function updateUnitSelection() {
		document
			.getElementById("metricUnit")
			.classList.toggle("active", isMetric);
		document
			.getElementById("imperialUnit")
			.classList.toggle("active", !isMetric);
	}

	// Add event listeners to the heart rate input fields
	document
		.getElementById("restingHeartRate")
		.addEventListener("input", function () {
			validateHeartRate(this);
		});

	document
		.getElementById("maxHeartRate")
		.addEventListener("input", function () {
			validateHeartRate(this);
		});

	document
		.getElementById("calculateBtn")
		.addEventListener("click", function () {
			// Get input values
			const marathonTime = document
				.getElementById("marathonTime")
				.value.split(":");
			const restingHR = parseInt(
				document.getElementById("restingHeartRate").value
			);
			const maxHR = parseInt(
				document.getElementById("maxHeartRate").value
			);

			// Validate inputs
			if (
				marathonTime.length !== 3 ||
				isNaN(restingHR) ||
				isNaN(maxHR) ||
				restingHR <= 0 ||
				maxHR <= 0
			) {
				alert("Please enter valid values.");
				return;
			}

			const marathonSeconds =
				+marathonTime[0] * 3600 +
				+marathonTime[1] * 60 +
				+marathonTime[2];
			const marathonPace =
				marathonSeconds / (isMetric ? 42.195 : 26.2188); // km or miles
			const hrReserve = maxHR - restingHR;

			// Calculate paces and HR ranges for each run type
			const paces = {
				marathon: {
					pace: marathonPace,
					hrMin: Math.round(restingHR + 0.73 * hrReserve),
					hrMax: Math.round(restingHR + 0.83 * hrReserve),
				},
				longRun: {
					paceMin: marathonPace * 1.2,
					paceMax: marathonPace * 1.1,
					hrMin: Math.round(restingHR + 0.69 * hrReserve),
					hrMax: Math.round(restingHR + 0.78 * hrReserve),
				},
				ltRun: {
					paceMin: marathonPace * 0.95,
					paceMax: marathonPace * 0.85,
					hrMin: Math.round(restingHR + 0.82 * hrReserve),
					hrMax: Math.round(restingHR + 0.92 * hrReserve),
				},
				aerobicRun: {
					paceMin: marathonPace * 1.25,
					paceMax: marathonPace * 1.15,
					hrMin: Math.round(restingHR + 0.64 * hrReserve),
					hrMax: Math.round(restingHR + 0.75 * hrReserve),
				},
				recoveryRun: {
					paceMin: marathonPace * 1.35,
					paceMax: marathonPace * 1.25,
					hrMin: Math.round(restingHR + 0.55 * hrReserve),
					hrMax: Math.round(restingHR + 0.7 * hrReserve),
				},
			};

			// Format the pace into minutes and seconds per km
			function formatPace(pace, isMetric) {
				const minutes = Math.floor(pace / 60);
				const seconds = Math.round(pace % 60);
				return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
			}

			// Display the results
			document.getElementById("marathonPace").textContent = formatPace(
				paces.marathon.pace,
				isMetric
			);
			document.getElementById(
				"marathonHR"
			).textContent = `${paces.marathon.hrMin}-${paces.marathon.hrMax}`;

			document.getElementById("longRunPace").textContent = `${formatPace(
				paces.longRun.paceMin,
				isMetric
			)}-${formatPace(paces.longRun.paceMax, isMetric)}`;
			document.getElementById(
				"longRunHR"
			).textContent = `${paces.longRun.hrMin}-${paces.longRun.hrMax}`;

			document.getElementById("ltRunPace").textContent = `${formatPace(
				paces.ltRun.paceMin,
				isMetric
			)}-${formatPace(paces.ltRun.paceMax, isMetric)}`;
			document.getElementById(
				"ltRunHR"
			).textContent = `${paces.ltRun.hrMin}-${paces.ltRun.hrMax}`;

			document.getElementById(
				"aerobicRunPace"
			).textContent = `${formatPace(
				paces.aerobicRun.paceMin,
				isMetric
			)}-${formatPace(paces.aerobicRun.paceMax, isMetric)}`;
			document.getElementById(
				"aerobicRunHR"
			).textContent = `${paces.aerobicRun.hrMin}-${paces.aerobicRun.hrMax}`;

			document.getElementById(
				"recoveryRunPace"
			).textContent = `${formatPace(
				paces.recoveryRun.paceMin,
				isMetric
			)}-${formatPace(paces.recoveryRun.paceMax, isMetric)}`;
			document.getElementById(
				"recoveryRunHR"
			).textContent = `${paces.recoveryRun.hrMin}-${paces.recoveryRun.hrMax}`;

			// Update the unit label in the header
			document.getElementById("unitLabel").textContent = isMetric
				? "(km)"
				: "(mi)";
		});

	updateUnitSelection();
});
