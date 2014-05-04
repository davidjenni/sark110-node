SARK = require '../lib/sark-serial'

describe 'sark-serial', ->
  describe '#read', ->
    it 'cmd=1 (getVersion) returns version number', (done) ->
      SARK.read 1, (err, data) ->
        expect(err).to.be.null
        expect(data).not.to.be.null
        expect(data[0]).to.equal(2)
        done()

