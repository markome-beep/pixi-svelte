import { Assets, Container, Point, Sprite, Texture } from "pixi.js";
import { load_assets } from "./assets";
import type { Input } from "./input";

const row_off = [0, 16] as const;
const col_off = [23, 8] as const;

const make_map = async () => {
	const hexContainer = new Container();

	const texture: Texture = await Assets.load('hex');
	texture.source.scaleMode = 'nearest';

	for (let i = 0; i < 100; i++) {
		for (let j = 0; j < 100; j++) {
			if (i % 3 === 0 && j % 4 === 0) {
				continue;
			}
			const tile = Sprite.from(texture);
			tile.cursor = "hand";
			tile.on('pointerover', () => { tile.alpha = 0.5 });
			tile.on('pointerleave', () => { tile.alpha = 1 });
			tile.eventMode = 'static';
			tile.y = (row_off[1] * i + col_off[1] * j);
			tile.x = (row_off[0] * i + col_off[0] * j);
			tile.anchor.set(0.5);
			hexContainer.addChild(tile);
		}
	}

	return hexContainer
}

const make_camera = (stage: Container) => {
	const camera = new Container;

	const zoom_speed = 0.1;
	let is_dragging = false;
	let last_pos = { x: 0, y: 0 };
	let mouse_down_pos = { x: 0, y: 0 }

	stage.on("mousedown", (event) => {
		is_dragging = true;
		mouse_down_pos = { x: event.clientX, y: event.clientY };
		last_pos = { x: camera.x, y: camera.y };

	})
		.on("mousemove", (event) => {
			if (!is_dragging) return;
			const dx = event.clientX - mouse_down_pos.x + last_pos.x;
			const dy = event.clientY - mouse_down_pos.y + last_pos.y;
			camera.x = dx;
			camera.y = dy;
		})
		.on("mouseleave", () => { is_dragging = false })
		.on("mouseup", () => { is_dragging = false })
		.on("wheel", (event) => {
			event.preventDefault();
			const zoom_factor = event.deltaY > 0 ? (1 - zoom_speed) : (1 + zoom_speed);

			let mouse = camera.toLocal({ x: event.clientX, y: event.clientY });

			camera.x += (mouse.x - camera.pivot.x) * camera.scale.x;
			camera.y += (mouse.y - camera.pivot.y) * camera.scale.y;

			camera.pivot.set(mouse.x, mouse.y);
			camera.scale.x *= zoom_factor;
			camera.scale.y *= zoom_factor;
		})
	stage.eventMode = 'static';

	camera.label = 'camera';
	stage.addChild(camera);

	return camera
}

export const init_game = async (stage: Container) => {
	load_assets();
	const camera = make_camera(stage)
	const hexContainer = await make_map();
	camera.addChild(hexContainer);
}

export const update = (input: Input, stage: Container) => {
	return () => { }
}

export const draw = () => {
	return () => { }
}
