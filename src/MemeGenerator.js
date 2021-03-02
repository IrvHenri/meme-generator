import React from "react";
import "./App.css";

class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((res) => {
        const { memes } = res.data;
        this.setState({
          allMemeImgs: memes,
        });
      });
  }

  handleClick(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const randomNum = Math.floor(Math.random() * this.state.allMemeImgs.length);

    const randMemeImg = this.state.allMemeImgs[randomNum].url;
    this.setState({ randomImg: randMemeImg });
  }

  render() {
    return (
      <div className="meme-container">
        <form className="meme-form" onSubmit={this.handleOnSubmit}>
          <input
            name="topText"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.handleClick}
          />
          <input
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleClick}
          />

          <button>Gen</button>
        </form>

        <div className="meme">
          <img src={this.state.randomImg} alt="picture of meme" />
          <h2 className="top-text">{this.state.topText}</h2>
          <h2 className="bottom-text">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
