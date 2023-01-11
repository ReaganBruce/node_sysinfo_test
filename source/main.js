import { promises as fs } from 'fs';
import systeminfo from 'systeminformation';


const networkData = async (filePath) => {
    const data = await systeminfo.networkStats()
    const dataObj = [] //when pushed; typeof object
    try {
        data.forEach(stat => dataObj.push({
            "- Network IF": stat.iface,
            "- Operation State": stat.operstate
        }))
        fs.writeFile(filePath, JSON.stringify(dataObj[0], null, 2), { encoding: 'utf8' })
        console.log(`File written at: ${filePath}`)
    } catch (err) {
        console.log(err)
    }
}
networkData('./source/logs/network-meta.json')

const cpuData = async (filePath) => {
    const data = await systeminfo.cpu()
    const dataObj = {
        "- Manufacturer:": data.manufacturer,
        "- brand:": data.brand,
        "- speed:": data.speed,
        "- cores:": data.cores,
        "- physical cores": data.physicalCores
    }
    try {
        await fs.writeFile(filePath, JSON.stringify(dataObj, null, 2), {encoding: 'utf-8'})
        console.log(`File written at: ${filePath}`)
    } catch (err) {
        console.log(err)
    }
}
cpuData('./source/logs/cpulogs.json')


 const networkIfData = async (filePath) => {
    const [ data ] = await systeminfo.networkInterfaces() //destruct obj to ignore unnecessary data
    const dataObj = {
        "- Network Interface Name:": data.ifaceName,
        "- IP4:": data.ip4,
        "- IP4 Subnet:": data.ip4subnet,
        "- MAC:": data.mac,
        "- DHCP": data.dhcp ? "DHCP is active" : "DHCP is not active"
    }
    try {
       fs.writeFile(filePath, JSON.stringify(dataObj, null, 2), { encoding: 'utf-8'})
       console.log(`File written at: ${filePath}`)
    } catch (err) {
        console.log(err)
    }
}
networkIfData('./source/logs/networklogs.json')
