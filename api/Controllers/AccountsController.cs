using api.DTOs;
using api.Data;
using api.Entities;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace api.Controllers
{
    public class AccountsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountsController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
            
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            // search for user 
            var user = await _context.Users.SingleOrDefaultAsync(
                x=> x.UserName == loginDto.Username.ToUpper()
            );
            if(user == null) return Unauthorized();

            // Used for hashing password
            using var hmac = new HMACSHA512(user.PasswordSalt);

            // Hash entered password
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            // Check each character in hashed password
            for(int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
            }

            return new UserDto 
            {
                UserName = user.UserName.ToUpper(),
                Token = _tokenService.CreateToken(user)
            };

        }
        // POST: api/account/register
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            // Check for username
            if(await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            // Used for hashing
            using var hmac = new HMACSHA512();

            // Create new user
            var user = new User{
                UserName = registerDto.Username.ToUpper(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };
            
            // Add user
            _context.Users.Add(user);
            // Save database
            await _context.SaveChangesAsync();
            // return user this will be used to save login session on client
            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToUpper());
        }
        
    }
}