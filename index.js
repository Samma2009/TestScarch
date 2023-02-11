
// create by scratch3-extension generator
const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;

const menuIconURI = null;
const blockIconURI = null;

class ScratchGL{
  constructor (runtime){
    this.runtime = runtime;
    // communication related
    this.comm = runtime.ioDevices.comm;
    this.session = null;
    this.runtime.registerPeripheralExtension('ScratchGL', this);
    // session callbacks
    this.reporter = null;
    this.onmessage = this.onmessage.bind(this);
    this.onclose = this.onclose.bind(this);
    this.write = this.write.bind(this);
    // string op
    this.decoder = new TextDecoder();
    this.lineBuffer = '';
  }

  onclose (){
    this.session = null;
  }

  write (data, parser = null){
    if (this.session){
      return new Promise(resolve => {
        if (parser){
          this.reporter = {
            parser,
            resolve
          }
        }
        this.session.write(data);
      })
    }
  }

  onmessage (data){
    const dataStr = this.decoder.decode(data);
    this.lineBuffer += dataStr;
    if (this.lineBuffer.indexOf('\n') !== -1){
      const lines = this.lineBuffer.split('\n');
      this.lineBuffer = lines.pop();
      for (const l of lines){
        if (this.reporter){
          const {parser, resolve} = this.reporter;
          resolve(parser(l));
        };
      }
    }
  }

  scan (){
    this.comm.getDeviceList().then(result => {
        this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
    });
  }

  getInfo (){
    return {
      id: 'ScratchGL',
      name: 'ScratchGL',
      color1: '#3200ff',
      color2: '#0014ff',
      menuIconURI: menuIconURI,
      blockIconURI: blockIconURI,
      blocks: [
        {
          opcode: 'FPS',
          blockType: BlockType.REPORTER,
          text: 'FPS'
        },
        {
          opcode: 'LoadFromJson',
          blockType: BlockType.COMMAND,
          arguments: {
            Json: {
              type: ArgumentType.STRING
            }
          },
          text: 'Load From Json [Json]'
        },
        {
          opcode: 'RenderUpdate',
          blockType: BlockType.HAT,
          isEdgeActivated: false,
          text: 'Render Update'
        },
        {
          opcode: 'RenderBegin',
          blockType: BlockType.HAT,
          isEdgeActivated: false,
          text: 'Render Begin'
        },
        {
          opcode: 'DrawToScreen',
          blockType: BlockType.COMMAND,
          text: 'Draw To Screen'
        },
        {
          opcode: 'MakeRender',
          blockType: BlockType.COMMAND,
          text: 'Make Render'
        }
      ]
    }
  }

FPS (args, util){

  return this.write(`M0 \n`);
}

LoadFromJson (args, util){
  const Json = args.Json;

  return this.write(`M0 \n`);
}

RenderUpdate (args, util){

  return this.write(`M0 \n`);
}

RenderBegin (args, util){

  return this.write(`M0 \n`);
}

DrawToScreen (args, util){

  return this.write(`M0 \n`);
}

MakeRender (args, util){

  return this.write(`M0 \n`);
}

}

module.exports = ScratchGL;
