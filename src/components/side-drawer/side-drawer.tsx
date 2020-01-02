import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @Prop({ reflect: true }) title: string;
  @Prop({ reflect: true, mutable: true }) open: boolean;

  onCloseDrawer() {
    this.open = false;
  }

  onContactChange(contact: string) {

  }

  render() {
    let mainContent = <slot />;
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
    return (
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>

        <section id="tabs">
          <button class="active"
                  onClick={this.onContactChange.bind(this, 'nav')}>
            Navigation
          </button>

          <button onClick={this.onContactChange.bind(this, 'contact')}>Contact</button>
        </section>

        <main>
          {mainContent}
        </main>
      </aside>
    );
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
