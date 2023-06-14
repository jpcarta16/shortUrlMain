

export const validateUrlString = (fin: string) =>{
  if(fin.length>100)throw new Error('too long')
  return fin
}

export const hashCreator = (stin: string)=>{
  return String(Math.random()*10000)
}