import { Component, Prop, h, State, Method } from '@stencil/core';

@Component({
  tag: 'my-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @State() showContactInfo = false;
  @Prop({ reflect: true }) title: string;
  @Prop({ reflect: true, mutable: true, attribute: 'is-opened' }) isOpened: boolean;

  onCloseDrawer() {
    this.isOpened = false;
  }

  onContactChange(contact: string) {
    this.showContactInfo = contact === 'contact';
  }

  @Method()
  open() {
    this.isOpened = true;
  }

  render() {
    let mainContent = <slot />;

    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contact Information</h2>
          <p>You can reach us via phone or email.</p>
          <ul>
            <li>Phone: 997813451</li>
            <li>
              Email:
              <a href="mailto:something@something.com">something@something.com</a>
            </li>
          </ul>
        </div>
      );
    }

    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)} />,
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>

        <section id="tabs">
          <button class={!this.showContactInfo ? 'active' : ''}
                  onClick={this.onContactChange.bind(this, 'nav')}>
            Navigation
          </button>

          <button class={this.showContactInfo ? 'active' : ''}
                  onClick={this.onContactChange.bind(this, 'contact')}>Contact</button>
        </section>

        <main>
          {mainContent}
        </main>
      </aside>
    ];
  }
}



    // let content = null;
    // if (this.open) {
    //   content = (
    //     <aside>
    //       <header>
    //         <h1>{this.title}</h1>
    //       </header>

    //       <main>
    //         <slot />
    //       </main>
    //     </aside>
    //   );
    // }
