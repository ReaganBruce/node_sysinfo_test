import systeminfo from 'systeminformation'

const cpuData = async () => {
    const data = await systeminfo.cpu()
    try {
        console.log('CPU Information:')
        console.log('------------------------------------------')
        console.log(`- manufaturer: ${data.manufacturer}`)
        console.log(`- brand: ${data.brand}`)
        console.log(`- speed: ${data.speed}`)
        console.log(`- cores: ${data.cores}`);
        console.log(`- physical cores: ${data.physicalCores}`);
        console.log('------------------------------------------')
    } catch (err) {
        console.log(err);
    }
}
cpuData()

const networkData = async () => {
    const data = await systeminfo.networkStats()
    try {
        data.forEach(stat => {
            console.log('Network Statistics:');
            console.log('------------------------------------------')
            console.log(`Network Interface Type: ${stat.iface}`);
            console.log(`Opperational State: ${stat.operstate}`);
            console.log('------------------------------------------')
        })
    } catch (err) {
        console.log(err);
    }
}
networkData()

const networkIfData = async () => {
    const [ data ] = await systeminfo.networkInterfaces() //deconstruct obj to ignore unnecessary data
    try {
       console.log('Network Interface Statistics: ');
       console.log('------------------------------------------')
       console.log(`Network Interface Name: ${data.ifaceName}`)
       console.log(`IP4: ${data.ip4}`);
       console.log(`IP4 Subnet: ${data.ip4subnet}`);
       console.log(`MAC: ${data.mac}`);
       data.dhcp ? console.log('DHCP is active') : console.log('DHCP is not active')
       console.log('------------------------------------------')
    } catch (err) {
        console.log(err);
    }
}
networkIfData()