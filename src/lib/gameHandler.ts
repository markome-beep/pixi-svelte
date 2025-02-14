import { Assets, Container, Graphics, Polygon, Sprite, Texture } from "pixi.js";
import { load_assets } from "$lib/assets";
import type { Input } from "$lib/input";

const row_off = [0, 16] as const;
const col_off = [23, 8] as const;

const make_map = async () => {
	const hexContainer = new Container();

	const texture: Texture = await Assets.load('hex');
	texture.source.scaleMode = 'nearest';


	let nums = 10;
	for (let i = 0; i < nums * 2 - 1; i++) {
		for (let j = Math.max(-i, -nums + 1); j < Math.min(nums, nums * 2 - i - 1); j++) {
			if (Math.random() > .7) {
				continue;
			}
			const tile = Sprite.from(texture);
			const hitArea = [
				0, 15,
				8, 7,
				24, 7,
				32, 15,
				24, 24,
				8, 24
			].map((e) => e - 16);
			tile.hitArea = new Polygon(hitArea);
			tile.on('pointerover', () => { tile.alpha = 0.5 });
			tile.on('pointerleave', () => { tile.alpha = 1 });
			tile.eventMode = 'static';
			tile.y = (row_off[1] * i + col_off[1] * j);
			tile.x = (row_off[0] * i + col_off[0] * j);
			tile.anchor.set(0.5);

			////Debug hit area
			//const g = new Graphics().poly(hitArea).fill();
			//g.x = tile.x
			//g.y = tile.y
			//hexContainer.addChild(g);

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

	stage.on("pointerdown", (event) => {
		is_dragging = true;
		mouse_down_pos = { x: event.clientX, y: event.clientY };
		last_pos = { x: camera.x, y: camera.y };

	})
		.on("pointermove", (event) => {
			if (!is_dragging) return;
			const dx = event.clientX - mouse_down_pos.x + last_pos.x;
			const dy = event.clientY - mouse_down_pos.y + last_pos.y;
			camera.x = dx;
			camera.y = dy;
		})
		.on("pointerupoutside", () => { is_dragging = false })
		.on("pointerup", () => { is_dragging = false })
		.on("wheel", (event) => {
			event.preventDefault();
			const zoom_factor = (event.deltaY || -1) > 0 ? (1 - zoom_speed) : (1 + zoom_speed);

			let mouse = camera.toLocal({ x: event.clientX - 10, y: event.clientY - 70 });

			camera.x += (mouse.x - camera.pivot.x) * camera.scale.x;
			camera.y += (mouse.y - camera.pivot.y) * camera.scale.y;

			camera.pivot.set(mouse.x, mouse.y);
			camera.scale.x *= zoom_factor;
			camera.scale.y *= zoom_factor;
		})
	stage.eventMode = 'static';

	camera.label = 'camera';
	stage.addChild(camera);
	camera.x = 450;
	camera.y = 50;

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
