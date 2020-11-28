interface IOptions {
  starcount: number;
  value: number;
  readonly: boolean
}

const defaultOptions: IOptions = {
  starcount: 5,
  value: 3,
  readonly: false
}

export class StarRating {
  private options!: IOptions;
  private selector: HTMLElement;
  private stars: any[] = [];
  constructor(selector: string, options?: IOptions) {
    this.selector = (document.querySelector(selector) as HTMLElement);
    this.selector.className = 'stars-outer';
    this.options = { ...defaultOptions, ...options };
    this.projectTemplate();

  }

  protected projectTemplate() {
    if (this.options.readonly) {
      this.readOnlyStarFn();
    } else {
      this.starFn();
    }
  }

  readOnlyStarFn() {
    let backStar = document.createElement('div');
    backStar.className = 'back-star';
    let frontStar = document.createElement('div');
    frontStar.className = 'front-star';
    for (let i = 0; i < this.options.starcount; i++) {
      let b: any = document.createElement('div');
      b.className = 'star';
      b.setAttribute('data-star', i.toString());
      backStar.appendChild(b);
      if (i < Math.ceil(this.options.value)) {
        let f: any = document.createElement('div');
        f.className = 'star full';
        f.setAttribute('data-active', i.toString());
        frontStar.appendChild(f);
      }
    }
    this.selector.appendChild(backStar)
    this.selector.appendChild(frontStar)
    const starPercentage = (this.options.value / this.options.starcount) * 100;
    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
    (document.querySelector(`.front-star`) as HTMLElement).style.width = starPercentageRounded;
  }

  protected highlight(index: number) {
    this.stars.forEach((star: HTMLElement, i: number) => {
      star.classList.toggle('full', i <= index);
    });
  }

  protected starFn() {

    this.stars = [];

    for (let i = 0; i < this.options.starcount; i++) {
      let s: any = document.createElement('div');
      s.className = 'star';
      s.setAttribute('data-star', i.toString())
      this.selector.appendChild(s);
      this.stars.push(s);
    }
    this.highlight(this.options.value - 1);
    this.eventRegistration();
  }

  private eventRegistration() {
    this.selector.addEventListener('mousemove', (e) => {
      let box = this.selector.getBoundingClientRect(),
        starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);

      this.highlight(starIndex);
    });

    this.selector.addEventListener('mouseout', () => {
      this.highlight(this.options.value - 1);
    });

    this.selector.addEventListener('click', e => {
      let box = this.selector.getBoundingClientRect(),
        starIndex = Math.floor((e.pageX - box.left) / box.width * this.stars.length);

      this.options.value = starIndex + 1;

      let rateEvent = new Event('rate', { bubbles: true, cancelable: true });
      this.selector.dispatchEvent(rateEvent);
    });

  }

}

