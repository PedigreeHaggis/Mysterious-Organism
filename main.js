// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


function pAequorFactory(specimenNum, dna){
  return {
    specimenNum,
    dna,
    mutate(){
      const rand = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      
      console.log(`dna base: ${this.dna[rand]}`);
      console.log(`replacement base: ${newBase}`);

      while(newBase === this.dna[rand]){
        console.log(`new base same as existing base reassigning`);
        newBase = returnRandBase();
        console.log(`reassgined base ${newBase}`);
      }
      this.dna[rand] = newBase;
      return this.dna
    },
    compareDNA(pAequorObj){
      let count = 0;
      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === pAequorObj.dna[i]){
          count++;
        }
      }
      const percentage = (count / this.dna.length * 100).toFixed(2);
      return `speciemen ${this.specimenNum} and ${pAequorObj.specimenNum} have %${percentage} DNA in common`;
    },
    willLikelySurvive(){
      const cOrG = this.dna.filter(x => x === 'C' || x === 'G');
      return cOrG.length / this.dna.length > 0.6;
    }
  };
}

const survivors = []
let id = 1

while(survivors.length < 30){
  let newMon = pAequorFactory(id, mockUpStrand());
  if(newMon.willLikelySurvive()){
    survivors.push(newMon)
  }
  id++;
}
console.log(survivors)