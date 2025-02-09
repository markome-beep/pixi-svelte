import { assets } from "$app/paths";
import { Assets, Spritesheet, type SpritesheetData, AnimatedSprite, Container, Sprite } from "pixi.js";

export const load_assets = async () => {
	const manifest = {
		bundles: [
			{
				name: 'background',
				assets: [
					{
						alias: 'sky',
						src: '/sprites/sky.png',
					},
					{
						alias: 'ground',
						src: '/sprites/ground.png',
					},
				],
			},
			{
				name: "tiles",
				assets: [
					{
						alias: 'hex',
						src: '/sprites/Hex_Tile.png'
					}
				]
			},
			{
				name: 'hero',
				assets: [
					{
						alias: 'hero',
						src: '/sprites/hero-sheet.png',
					},
					{
						alias: 'shadow',
						src: '/sprites/shadow.png',
					},
				],
			},
		],
	};

	await Assets.init({ manifest });
	Assets.backgroundLoadBundle(['background', 'hero', 'tiles']);
}

export const load_hero = async () => {
	let v_frames = 8;
	let h_frames = 3;
	let [sprite_h, sprite_w] = [32, 32];

	let atlasData: SpritesheetData = {
		meta: {
			image: '/sprites/hero-sheet.png',
			scale: 1,
			format: 'RGBA8888',
			size: { w: sprite_w * h_frames, h: sprite_h * v_frames },
		},
		frames: {},
		animations: {
			walk: ['walk1', 'walk2', 'walk3', 'walk4']
		}
	}

	let frame_count = 1;
	for (let v = 0; v < v_frames; v++) {
		for (let h = 0; h < h_frames; h++) {
			atlasData.frames[`walk${frame_count}`] = {
				frame: { x: sprite_w * h, y: sprite_h * v, w: sprite_w, h: sprite_h },
				sourceSize: { w: sprite_w, h: sprite_h },
				spriteSourceSize: { x: 0, y: 0, w: sprite_w, h: sprite_h },
			}
			frame_count++;
		}
	}

	let hero = new Container();
	const spritesheet = new Spritesheet(
		await Assets.load('hero'),
		atlasData
	);
	await spritesheet.parse();

	let anim = new AnimatedSprite(spritesheet.animations.walk);
	anim.label = "Hero-Body";
	hero.addChild(anim);

	let shadow = Sprite.from(await Assets.load('shadow'));
	shadow.label = "Hero-Shadow";
	hero.addChild(shadow);

	anim.animationSpeed = 0.12;
	hero.pivot.set(8, 21);
	hero.x = 16 * 6;
	hero.y = 16 * 5;
	// anim.play();
	return hero
}
