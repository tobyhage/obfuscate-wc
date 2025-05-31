import { Component, Element, Listen, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'obfuscate-link',
  shadow: true,
})
export class ObfuscateLink {
  @Prop() email: string;
  @Prop() tel: string;
  @Prop() sms: string;
  @Prop() facetime: string;
  @Prop() href: string;
  @Prop() headers: Record<string, string>;
  @Prop() linkTitle: string;
  @Prop() decoder: (value: string) => string = (value: string) => window.atob(value);
  @Element() host: HTMLElement;
  @State() human: boolean = false;

  @Listen('focus', { target: 'window' })
  handleFocus() {
    this.human = true;
  }

  @Listen('mouseover', { target: 'window' })
  handleMouseOver() {
    this.human = true;
  }

  @Listen('contextmenu', { target: 'window' })
  handleContextMenu() {
    this.human = true;
  }

  @Listen('click')
  handleClick() {
    this.human = true;
  }

  generateLink() {
    let link = '';
    let text = '';

    const combineHeaders = (params: Record<string, string>) => {
      return Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');
    };

    if (this.email) {
      text = this.decoder(this.email);
      link = `mailto:${text}`;

      if (this.headers) {
        link += `?${combineHeaders(this.headers)}`;
      }
    } else if (this.tel) {
      text = this.decoder(this.tel);
      link = `tel:${text}`;
    } else if (this.sms) {
      text = this.decoder(this.sms);
      link = `sms:${text}`;
    } else if (this.facetime) {
      text = this.decoder(this.facetime);
      link = `facetime:${text}`;
    } else if (this.href) {
      text = this.decoder(this.href);
      link = text;
    }

    return <a part="link" href={link} title={this.linkTitle}><slot>{text}</slot></a>;
  }

  render() {
    if (this.human) {
      return this.generateLink();
    }
    return <span>Not for the bots</span>;
  }
}
