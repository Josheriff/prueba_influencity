var request = require('supertest');
describe('influencity express routes', function() {
    var server;
    this.timeout(15000);
    before(function() {
        server = require('../server');
    });

    after(function() {
        server.close();
    });

    describe('404 everything else', function() {
        it('/', function testPath(done) {
            request(server)
                .get('/')
                .expect(404, done);
        });
        it('/api', function testPath(done) {
            request(server)
                .get('/api')
                .expect(404, done);
        });
        it('/api/log', function testPath(done) {
            request(server)
                .get('/api/log')
                .expect(404, done);
        });
        it('Other routes', function testPath(done) {
            request(server)
                .get('/invented/random/fun/bunny...')
                .expect(404, done);
        });
    })
    describe('/api/user/', function() {
        it('responds 200 to /api/user/influencityES', function testSlash(done) {
            request(server)
                .get('/api/user/influencityES')
                .expect(200, done);
        });
        it('responds 418 to /api/user/', function testSlash(done){
            request(server)
                .get('/api/user')
                .expect(418, done);
        })
        it('responds 500 to /api/user/123asd1q23123', function testSlash(done){
            request(server)
                .get('/api/user/123asd1q23123')
                .expect(500, done);
        })
    })

    describe('/api/log/list', function() {
        it('responds 200 to /api/log/list', function testSlash(done) {
            request(server)
                .get('/api/log/list')
                .expect(200, done);
        });
    })
});
