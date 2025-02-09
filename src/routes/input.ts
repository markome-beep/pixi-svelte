export type dir = "LEFT" | "RIGHT" | "DOWN" | "UP"

export class Input {
	heldDirections: dir[];

	constructor() {
		this.heldDirections = [];
		document.addEventListener("keydown", (e) => {
			if (e.code === "ArrowUp" || e.code === "KeyW") {
				this.onArrowPressed("UP")
			}

			if (e.code === "ArrowLeft" || e.code === "KeyA") {
				this.onArrowPressed("LEFT")
			}

			if (e.code === "ArrowRight" || e.code === "KeyD") {
				this.onArrowPressed("RIGHT")
			}

			if (e.code === "ArrowDown" || e.code === "KeyS") {
				this.onArrowPressed("DOWN")
			}
		});

		document.addEventListener("keyup", (e) => {
			if (e.code === "ArrowUp" || e.code === "KeyW") {
				this.onArrowReleased("UP")
			}

			if (e.code === "ArrowLeft" || e.code === "KeyA") {
				this.onArrowReleased("LEFT")
			}

			if (e.code === "ArrowRight" || e.code === "KeyD") {
				this.onArrowReleased("RIGHT")
			}

			if (e.code === "ArrowDown" || e.code === "KeyS") {
				this.onArrowReleased("DOWN")
			}
		});
	}

	onArrowPressed(dir: dir) {
		if (this.heldDirections.includes(dir)) {
			return;
		}
		this.heldDirections.push(dir);
	}

	onArrowReleased(dir: dir) {
		const index = this.heldDirections.indexOf(dir);
		if (index != -1) {
			this.heldDirections.splice(index, 1);
		}
	}

	get direction() {
		return this.heldDirections.at(-1)
	}
}
