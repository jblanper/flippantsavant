export default class LogoMenuItem {
    constructor (id) {
        this.id = id;
        this.sectionName = id.split('-')[0];

        // html elements
        this.sectionElem = document.querySelector(`#${this.sectionName}`);
        this.parent = document.querySelector(`#${id}`);
        this.textElem = document.querySelector(`#${this.sectionName}-text`);
        this.lineElem = document.querySelector(`#${this.sectionName}-line`);

        // attributes
        this.lineWidth = Number(this.lineElem.getAttribute('width'));
        this.textX = Number(this.textElem.getAttribute('x'));
        this.fill = this.lineElem.getAttribute('fill');

        this.origAttributes = {
            lineWidth: this.lineWidth,
            textX: this.textX
        };

        // for animation
        this.animationID = undefined;
        this.selected = false;
    }

    reset () {
        this.lineWidth = this.origAttributes.lineWidth;
        this.textX = this.origAttributes.textX;

        this.lineElem.setAttribute('width', this.lineWidth);
        this.textElem.setAttribute('x', this.textX);
        this.textElem.setAttribute('fill', '#000');
    }

    // animations
    moveOut () {
        // when hovering
        this.lineWidth += 1;
        this.textX += 1;

        this.lineElem.setAttribute('width', this.lineWidth);
        this.textElem.setAttribute('x', this.textX);

        if (this.lineWidth > this.origAttributes.lineWidth + 8) return;

        this.animationID = window.requestAnimationFrame(this.moveOut.bind(this));
    }

    moveIn () {
        // when stop hovering
        this.lineWidth -= 1;
        this.textX -= 1;

        this.lineElem.setAttribute('width', this.lineWidth);
        this.textElem.setAttribute('x', this.textX);

        if (this.lineWidth <= this.origAttributes.lineWidth) return;

        this.animationID = window.requestAnimationFrame(this.moveIn.bind(this));
    }

    handleMouseEnter () {
        if (this.selected) return;

        this.textElem.setAttribute('fill', this.fill);
        window.requestAnimationFrame(this.moveOut.bind(this));
    }
    
    handleMouseLeave () {
        if (this.selected) return;
        
        window.cancelAnimationFrame(this.animationID);
        this.animationID = undefined;
        this.textElem.setAttribute('fill', '#000');

        window.requestAnimationFrame(this.moveIn.bind(this));
    }

    
    setAnimations () {
        this.parent.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.parent.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }
}