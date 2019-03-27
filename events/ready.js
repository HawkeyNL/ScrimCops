exports.run = (client) => {
    console.log(`[Ready] ${client.user.username} - v${client.version} - ${client.commands.size} commands.`);
    console.log(`[Shards] ID: ${client.options.shardID}`);
    if(client.options.shardID === 0) {
      setTimeout(() => {
        console.log('Shards are dying. Attempting to destroy.');
        client.destroy();
    }, 5000);
    }
    client.user.setActivity(`${client.prefix}help | ${client.prefix}register`, { type: 'WATCHING'});
}