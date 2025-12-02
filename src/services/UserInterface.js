import { HealthbarMaskConfig, loadUISprites, UIspriteConfig } from "../../config/SpriteConfig.js";
import Animation from "../../lib/Animation.js";
import Easing from "../../lib/Easing.js";
import ImageName from "../enums/ImageName.js";
import { images, timer } from "../globals.js";

export default class UserInterface {

    constructor(player) {
        this.player = player;

        this.Mask = loadUISprites(
            images.get(ImageName.FullMask),
            HealthbarMaskConfig
        );

        this.maskSprite = this.Mask.mask[0];
        this.maskOutline = this.Mask.maskoutline[0];
        this.maskBreakSprites = this.Mask.breakanimation;

        this.masks = [];
        for (let i = 0; i < player.health; i++) {
            this.masks.push({
                scale: 0,
                breakAnim: null,
                isShattering: false
            });
        }
        this.isInitialized = false;
        // Play intro stagger animation
        this.animateInitialMasks();

        this.UISprites = loadUISprites(
            images.get(ImageName.Healthbar),
            UIspriteConfig
        );

        this.initialAnimation = new Animation(
            this.UISprites.healthbarspawn,
            0.12,
            1
        );

        this.hasPlayedIntro = false;
    }

    update(dt) {
        if (!this.hasPlayedIntro) {
            this.initialAnimation.update(dt);
            if (this.initialAnimation.isDone()) {
                this.hasPlayedIntro = true;
            }
            return;
        }

        for (let mask of this.masks) {
            if(mask.breakAnim) mask.breakAnim.update(dt);
        }
        this.syncMasksToPlayerHealth();
    }

    async animateInitialMasks() {
        const stagger = 0.08;
        const growDuration = 0.25;

        for (let i = 0; i < this.masks.length; i++) {
            await timer.wait(stagger);

            let mask = this.masks[i];

            // Mask grows from scale 0 → 1
            await timer.tweenAsync(mask, { scale: 1 }, growDuration, Easing.outBack);
        }

        this.isInitialized = true;
    }

    syncMasksToPlayerHealth() {
        const hp = this.player.health;

        for (let i = 0; i < this.masks.length; i++) {
            const mask = this.masks[i];

            if (i < hp && mask.scale !== 1) {
                // Tween in (heal)
                timer.tween(mask, { scale: 1 }, 0.2, Easing.outBack);
            }
            else if (i >= hp && mask.scale !== 0) {
                // Play shatter animation once when taking damage
                if (!mask.isShattering) {
                    mask.isShattering = true;
                    mask.breakAnim = new Animation(
                        this.maskBreakSprites,
                        0.04,
                        1,       // plays once
                        () => {
                            mask.breakAnim = null;
                            mask.isShattering = false;
                        }
                    );
                }

                // Tween to 0 (disappear)
                timer.tween(mask, { scale: 0 }, 0.15, Easing.inBack);
            }
        }
    }

    render(context) {
        context.save();

        

        const scale = 0.2;
        const x = 20;
        const y = 20;
        context.scale(scale,scale);
        if (!this.hasPlayedIntro) {
            this.renderInitialAnimation(x, y);
        } else {
            this.renderStatic(context, x, y);
        }

        context.restore();
    }

    renderInitialAnimation(x, y) {
        this.initialAnimation.getCurrentFrame().render(x, y);
    }

    renderStatic(context, x, y) {

        // Draw static bar background
        this.UISprites.healthbarspawn[5].render(x, y);

        // Draw mask segments
        const offsetX = 140; // distance per mask

        const scale = 0.7;
        context.scale(scale,scale);

        for (let i = 0; i < this.masks.length; i++) {
            const mask = this.masks[i];
            const mx = x + i * offsetX;

            // Draw outline first (always)
            this.maskOutline.render(mx, y);

            // Draw filled mask (scaled)
            if (mask.scale > 0) {
                context.save();
                context.translate(mx + this.maskSprite.width / 2, y + this.maskSprite.height / 2);
                context.scale(mask.scale, mask.scale);
                context.translate(-this.maskSprite.width / 2, -this.maskSprite.height / 2);
                this.maskSprite.render(0, 0);
                context.restore();
            }

            // Draw shatter animation over mask
            if (mask.breakAnim) {
                if(mask.breakAnim.isDone()) {
                    this.maskOutline.render(mx, y)
                } else {
                    mask.breakAnim.getCurrentFrame().render(mx, y);
                }
            } 
        }
    }
}