import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {

  const [item,setItem] = useState( {id: 0, temp: 169, heat: 0, fan: 0, mark: '', timestamp: new Date(), start: new Date()  } )
  const [data,setData] = useState([])

  const upTemp = () => { 
    var point = { ...item, temp: item.temp+1, id: item.id+1, timestamp: new Date()}
    setItem(point)
    setData(data.concat( [ {...point} ]) )
  }

  const upHeat = () => { 
    var point = { ...item, heat: item.heat+1, id: item.id+1, timestamp: new Date()}
    setItem(point)
    setData(data.concat( [ {...point} ]) )
  }

  const downHeat = () => { 
    var point = { ...item, heat: item.heat-1, id: item.id+1, timestamp: new Date()}
    setItem(point)
    setData(data.concat( [ {...point} ]) )
  }

  const upFan = () => { 
    var point = { ...item, fan: item.fan+1, id: item.id+1, timestamp: new Date()}
    setItem(point)
    setData(data.concat( [ {...point} ]) )
  }

  const downFan = () => { 
    var point = { ...item, fan: item.fan-1, id: item.id+1, timestamp: new Date()}
    setItem(point)
    setData(data.concat( [ {...point} ]) )
  }

  const mark = () => { 
    var point = { ...item,  id: item.id+1, timestamp: new Date()}
    setItem(point)
    setData(data.concat( [ {...point, mark: 'M' } ]) )
  }

  const logKey = useCallback((e) => { 
    e.preventDefault()
    if (e.key === 'ArrowRight') document.getElementById('uptemp').click()
    if (e.key === 'ArrowUp') document.getElementById('upheat').click()
    if (e.key === 'ArrowDown') document.getElementById('downheat').click()
    if (e.key === '/') document.getElementById('upfan').click()
    if (e.key === 'ArrowLeft') document.getElementById('downfan').click()
    if (e.key === 'm') document.getElementById('mark').click()
    console.log(e)
    }, [])

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  }

  useEffect(() => { 
    document.addEventListener('keyup',logKey,false)
    return () => { document.removeEventListener('keyup',logKey,false)
    };
  }, []);

  return (
    <div className="App">
      
    <table className="table table-condensed"><tbody>
      <tr>
      <td><button className="btn btn-primary btn-sm short" id='uptemp' onClick={() => upTemp()}>UpTemp</button></td>
      <td><button className="btn btn-primary btn-sm short" id='upheat' onClick={() => upHeat()}>UpHeat</button></td>
      <td><button className="btn btn-primary btn-sm short" id='upfan' onClick={() => upFan()}>UpFan</button></td>
      </tr><tr>
      <td><button className="btn btn-primary btn-sm short" id='mark' onClick={() => mark()}>Mark</button></td>
      <td><button className="btn btn-primary btn-sm short" id='downheat' onClick={() => downHeat()}>DnHeat</button></td>
      <td><button className="btn btn-primary btn-sm short" id='downfan' onClick={() => downFan()}>DnFan</button></td>
      </tr>
      </tbody></table>
      <table className="table table-condensed">
          <thead>
              <tr>
                  <th className="text-center">Temp</th>
                  <th className="text-center">Heat</th>
                  <th className="text-center">Fan</th>
                  <th className="text-center">Mark</th>
                  <th className="text-center">Time</th>
                  <th className="text-center">Elapsed</th>
              </tr>
          </thead>
          <tbody>
              <tr>
              <td><input className="short" type="number"  name="temp" value={item.temp} onChange={handleChange} /></td>
              <td><input className="short" type="number"  name="heat" value={item.heat} onChange={handleChange} /></td>
              <td><input className="short" type="number"  name="fan" value={item.fan} onChange={handleChange} /></td>
              <td>{ item.mark }</td>
              <td>{ item.timestamp.toLocaleTimeString().slice(0,7) }</td>
              <td> { (item.timestamp - item.start)/1000 } </td>
              </tr>
              {data.map(item => (
                  <tr key={item.id}>
                  <td> { item.temp } </td><td> { item.heat } </td><td> { item.fan } </td><td> { item.mark } </td>
                  <td> { item.timestamp.toLocaleTimeString().slice(0,7) } </td><td> { (item.timestamp - item.start)/1000 } </td>
              </tr>)) }
        </tbody>
      </table>
    </div>
  );
}

export default App;
