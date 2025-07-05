using Microsoft.EntityFrameworkCore;

namespace ASMNT.Server.Repositories
{
    public interface IBaseRepository<T, in TPk> where T : class
    {
        // Get all entities as IQueryable
        IQueryable<T> Query();

        //// Get by predicate (with optional includes)
        //Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);

        //// Get a single entity by predicate
        //Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);

        //// Get by primary key (assuming single key)
        //Task<T?> GetByIdAsync(object id);

        //// Add new entity
        //Task<T> AddAsync(T entity);

        //// Add multiple entities
        //Task AddRangeAsync(IEnumerable<T> entities);

        //// Update entity
        //void Update(T entity);

        //// Remove entity
        //void Remove(T entity);

        //// Remove by key
        //Task RemoveByIdAsync(object id);

        //// Save changes (optional, if not using Unit of Work)
        //Task<int> SaveChangesAsync();
    }
    public abstract class BaseRepository<T, TPk> : IBaseRepository<T, TPk> where T : class
    {
        private DbContext DbContext { get; }
        protected DbSet<T> _dbSet { get; }

        public BaseRepository(DbContext context)
        {
            DbContext = context;
            _dbSet = DbContext.Set<T>();
        }
        public virtual IQueryable<T> Query()
        {
            return _dbSet.AsQueryable();
        }
        //public IQueryable<T> Query()
        //{
        //    return _dbSet.AsNoTracking();
        //}

        //public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
        //{
        //    return await _dbSet.Where(predicate).ToListAsync();
        //}

        //public async Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate)
        //{
        //    return await _dbSet.FirstOrDefaultAsync(predicate);
        //}

        //public async Task<T?> GetByIdAsync(object id)
        //{
        //    return await _dbSet.FindAsync(id);
        //}

        //public async Task<T> AddAsync(T entity)
        //{
        //    await db _dbSet.AddAsync(entity);
        //    return entity;
        //}

        //public async Task AddRangeAsync(IEnumerable<T> entities)
        //{
        //    await _dbSet.AddRangeAsync(entities);
        //}

        //public void Update(T entity)
        //{
        //    _dbSet.Update(entity);
        //}

        //public void Remove(T entity)
        //{
        //    _dbSet.Remove(entity);
        //}

        //public async Task RemoveByIdAsync(object id)
        //{
        //    var entity = await GetByIdAsync(id);
        //    if (entity != null)
        //    {
        //        _dbSet.Remove(entity);
        //    }
        //}

        //public async Task<int> SaveChangesAsync()
        //{
        //    return await _context.SaveChangesAsync();
        //}
    }
}
